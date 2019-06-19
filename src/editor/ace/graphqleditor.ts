import { Colors } from '../../Colors';

(window as any).ace.define(
  'ace/theme/graphqleditor',
  ['require', 'exports', 'module', 'ace/lib/dom'],
  (acequire: any, exports: any, module: any) => {
    exports.isDark = true;
    exports.cssClass = 'ace-graphqleditor';
    exports.cssText = `.ace-graphqleditor .ace_gutter {
    background: #232323;
    color: #E2E2E2
    }
    .ace-graphqleditor .ace_print-margin {
    width: 1px;
    background: #232323
    }
    .ace-graphqleditor {
    background-color: #141414;
    color: ${Colors.blue[1]}
    }
    .ace-graphqleditor .ace_identifier {
    color: ${Colors.grey[0]}
    }
    .ace-graphqleditor .ace_cursor {
    color: ${Colors.yellow[0]}
    }
    .ace-graphqleditor .ace_marker-layer .ace_selection {
    background: rgba(221, 240, 255, 0.20)
    }
    .ace-graphqleditor.ace_multiselect .ace_selection.ace_start {
    box-shadow: 0 0 3px 0px #141414;
    }
    .ace-graphqleditor .ace_marker-layer .ace_step {
    background: rgb(102, 82, 0)
    }
    .ace-graphqleditor .ace_marker-layer .ace_bracket {
    margin: -1px 0 0 -1px;
    border: 1px solid rgba(255, 255, 255, 0.25)
    }
    .ace-graphqleditor .ace_marker-layer .ace_active-line {
    background: rgba(255, 255, 255, 0.031)
    }
    .ace-graphqleditor .ace_gutter-active-line {
    background-color: rgba(255, 255, 255, 0.031)
    }
    .ace-graphqleditor .ace_marker-layer .ace_selected-word {
    border: 1px solid rgba(221, 240, 255, 0.20)
    }
    .ace-graphqleditor .ace_invisible {
    color: rgba(255, 255, 255, 0.25)
    }
    .ace-graphqleditor .ace_keyword,
    .ace-graphqleditor .ace_meta {
    color: ${Colors.main[0]}
    }
    .ace-graphqleditor .ace_constant,
    .ace-graphqleditor .ace_constant.ace_character,
    .ace-graphqleditor .ace_constant.ace_character.ace_escape,
    .ace-graphqleditor .ace_constant.ace_other,
    .ace-graphqleditor .ace_heading,
    .ace-graphqleditor .ace_markup.ace_heading,
    .ace-graphqleditor .ace_support.ace_constant {
    color: #CF6A4C
    }
    .ace-graphqleditor .ace_invalid.ace_illegal {
    color: #F8F8F8;
    background-color: rgba(86, 45, 86, 0.75)
    }
    .ace-graphqleditor .ace_invalid.ace_deprecated {
    text-decoration: underline;
    font-style: italic;
    color: #D2A8A1
    }
    .ace-graphqleditor .ace_support {
    color: #9B859D
    }
    .ace-graphqleditor .ace_fold {
    background-color: #AC885B;
    border-color: #F8F8F8
    }
    .ace-graphqleditor .ace_support.ace_function {
    color: #DAD085
    }
    .ace-graphqleditor .ace_list,
    .ace-graphqleditor .ace_markup.ace_list,
    .ace-graphqleditor .ace_storage {
    color: ${Colors.green[1]}
    }
    .ace-graphqleditor .ace_entity.ace_name.ace_function,
    .ace-graphqleditor .ace_meta.ace_tag,
    .ace-graphqleditor .ace_variable {
    color: #AC885B
    }
    .ace-graphqleditor .ace_string {
    color: ${Colors.grey[6]}
    }
    .ace-graphqleditor .ace_string.ace_regexp {
    color: #E9C062
    }
    .ace-graphqleditor .ace_comment {
    font-style: italic;
    color: #5F5A60
    }
    .ace-graphqleditor .ace_variable {
    color: #7587A6
    }
    .ace-graphqleditor .ace_xml-pe {
    color: #494949
    }
    .ace-graphqleditor .ace_indent-guide {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWMQERFpYLC1tf0PAAgOAnPnhxyiAAAAAElFTkSuQmCC) right repeat-y
    }`;

    const dom = acequire('../lib/dom');
    dom.importCssString(exports.cssText, exports.cssClass);
  }
);
