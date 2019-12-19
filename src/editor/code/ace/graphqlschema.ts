import { theme } from '../../../Graph/theme';

/* tslint:disable */

(window as any).ace.define(
  'ace/mode/graphqlschema_highlight_rules',
  ['require', 'exports', 'module', 'ace/lib/oop', 'ace/mode/text_highlight_rules'],
  (acequire: any, exports: any, module: any) => {
    'use strict';

    const oop = acequire('../lib/oop');
    const TextHighlightRules = acequire('./text_highlight_rules').TextHighlightRules;

    const GraphQLSchemaHighlightRules = function(this: any) {
      const mapFromTheme = Object.keys(theme.colors.node.types).reduce<Record<string, string>>((a, b) => {
        a[`${b}`] = b;
        return a;
      }, {});
      const keywordMapper = this.createKeywordMapper(
        {
          schema: 'schema',
          ...mapFromTheme,
        },
        'identifier',
      );
      const strPre = '(?:r|u|ur|R|U|UR|Ur|uR)?';
      const stringEscape = '\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv\'"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})';
      this.$rules = {
        start: [
          {
            token: 'comment',
            regex: '#.*$',
          },
          {
            token: 'string',
            regex: strPre + '"{3}',
            next: 'commentContent',
          },
          {
            token: 'paren.lparen',
            regex: /[\[({]/,
            next: 'start',
          },
          {
            token: 'paren.rparen',
            regex: /[\])}]/,
          },
          {
            token: keywordMapper,
            regex: '[a-zA-Z_$][a-zA-Z0-9_$]*\\b',
          },
        ],
        commentContent: [
          {
            token: 'constant.language.escape',
            regex: stringEscape,
          },
          {
            token: 'string', // multi line """ string end
            regex: '"{3}',
            next: 'start',
          },
          {
            defaultToken: 'string',
          },
        ],
      };
      this.normalizeRules();
    };

    oop.inherits(GraphQLSchemaHighlightRules, TextHighlightRules);

    exports.GraphQLSchemaHighlightRules = GraphQLSchemaHighlightRules;
  },
);

(window as any).ace.define(
  'ace/mode/folding/cstyle',
  ['require', 'exports', 'module', 'ace/lib/oop', 'ace/range', 'ace/mode/folding/fold_mode'],
  function(acequire: any, exports: any, module: any) {
    'use strict';

    const oop = acequire('../../lib/oop');
    const Range = acequire('../../range').Range;
    const BaseFoldMode = acequire('./fold_mode').FoldMode;

    const FoldMode = (exports.FoldMode = function(commentRegex: any) {
      if (commentRegex) {
        this.foldingStartMarker = new RegExp(
          this.foldingStartMarker.source.replace(/\|[^|]*?$/, '|' + commentRegex.start),
        );
        this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, '|' + commentRegex.end));
      }
    });
    oop.inherits(FoldMode, BaseFoldMode);

    (function(this: any) {
      this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;
      this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;
      this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/;
      this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
      this._getFoldWidgetBase = this.getFoldWidget;
      this.getFoldWidget = function(session: any, foldStyle: any, row: any) {
        const fw = this._getFoldWidgetBase(session, foldStyle, row);

        return fw;
      };

      this.getFoldWidgetRange = function(session: any, foldStyle: any, row: any, forceMultiline: any) {
        const line = session.getLine(row);

        let match = line.match(this.foldingStartMarker);
        if (match) {
          const i = match.index;

          if (match[1]) {
            return this.openingBracketBlock(session, match[1], row, i);
          }

          let range = session.getCommentFoldRange(row, i + match[0].length, 1);

          if (range && !range.isMultiLine()) {
            if (forceMultiline) {
              range = this.getSectionRange(session, row);
            } else if (foldStyle != 'all') {
              range = null;
            }
          }

          return range;
        }

        if (foldStyle === 'markbegin') {
          return;
        }

        match = line.match(this.foldingStopMarker);
        if (match) {
          const i = match.index + match[0].length;

          if (match[1]) {
            return this.closingBracketBlock(session, match[1], row, i);
          }

          return session.getCommentFoldRange(row, i, -1);
        }
      };

      this.getSectionRange = function(session: any, row: any) {
        let line = session.getLine(row);
        const startIndent = line.search(/\S/);
        const startRow = row;
        const startColumn = line.length;
        row = row + 1;
        let endRow = row;
        const maxRow = session.getLength();
        while (++row < maxRow) {
          line = session.getLine(row);
          const indent = line.search(/\S/);
          if (indent === -1) {
            continue;
          }
          if (startIndent > indent) {
            break;
          }
          const subRange = this.getFoldWidgetRange(session, 'all', row);

          if (subRange) {
            if (subRange.start.row <= startRow) {
              break;
            } else if (subRange.isMultiLine()) {
              row = subRange.end.row;
            } else if (startIndent == indent) {
              break;
            }
          }
          endRow = row;
        }

        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
      };
    }.call(FoldMode.prototype));
  },
);

(window as any).ace.define(
  'ace/mode/graphqlschema',
  [
    'require',
    'exports',
    'module',
    'ace/lib/oop',
    'ace/mode/text',
    'ace/mode/graphqlschema_highlight_rules',
    'ace/mode/folding/cstyle',
  ],
  function(acequire: any, exports: any, module: any) {
    'use strict';

    const oop = acequire('../lib/oop');
    const TextMode = acequire('./text').Mode;
    const GraphQLSchemaHighlightRules = acequire('./graphqlschema_highlight_rules').GraphQLSchemaHighlightRules;
    const FoldMode = acequire('./folding/cstyle').FoldMode;

    const Mode = function(this: any) {
      this.HighlightRules = GraphQLSchemaHighlightRules;
      this.foldingRules = new FoldMode();
    };
    oop.inherits(Mode, TextMode);

    (function(this: any) {
      this.lineCommentStart = '"""';
      this.$id = 'ace/mode/graphqlschema';
    }.call(Mode.prototype));

    exports.Mode = Mode;
  },
);
