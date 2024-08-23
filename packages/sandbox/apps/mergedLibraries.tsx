import React, { useCallback, useEffect, useState } from "react";
import { GraphQLEditor } from "graphql-editor";
import { PassedSchema } from "graphql-editor";
import * as schemas from "../schema";
import { FTree } from "graphql-editor/lib/editor/files/FileTree";

const leafs = [
  {
    dir: "src/modules/google/schema.graphql",
    content: schemas.googleDirections,
  },
  {
    dir: "src/modules/pizza/schema.graphql",
    content: schemas.pizza,
  },
  {
    dir: "src/main/schema.graphql",
    content: schemas.food,
  },
];

export const MergedLibraries = () => {
  const [currentSchema, setCurrentSchema] = useState("src/main/schema.graphql");
  const [copiedFile, setCopiedFile] = useState("");

  const [leafFiles, setLeafFiles] = useState(
    leafs.sort((a, b) => a.dir.localeCompare(b.dir))
  );
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: schemas.mergedLibs.code,
    libraries: schemas.mergedLibs.libraries,
    source: "outside",
  });

  useEffect(() => {
    if (currentSchema === "") {
      return;
    }

    setMySchema({
      source: "outside",
      code: leafFiles.find((l) => l.dir === currentSchema)?.content || "",
    });
  }, [currentSchema, leafFiles]);

  const generateUniqueName = (
    baseName: string,
    directory: string,
    extension: string
  ) => {
    let suffix = 1;
    let newName = `${baseName} (${suffix})`;
    let newPath = `${directory}/${newName}.${extension}`;

    const existingFiles = leafFiles
      .filter((file) => file.dir.startsWith(`${directory}`))
      .map((file) => file.dir);

    while (existingFiles.includes(newPath)) {
      suffix += 1;
      newName = `${baseName} (${suffix})`;
      newPath = `${directory}/${newName}.${extension}`;
    }

    return newName;
  };

  const onMove = useCallback(
    (source: FTree, target: FTree) => {
      const sourceDir = source.dir;
      let targetDir = target.dir;

      if (sourceDir === currentSchema) {
        setCurrentSchema("");
      }

      setLeafFiles((prevLeafFiles) => {
        const isTargetDirectory = !targetDir.includes(".");

        if (!isTargetDirectory) {
          console.warn(
            "Cannot move onto a file. Moving to parent directory instead."
          );
          targetDir = targetDir.split("/").slice(0, -1).join("/");
        }

        if (targetDir.startsWith(`${sourceDir}/`)) {
          console.warn(
            "Cannot move a parent directory into one of its subdirectories."
          );
          return prevLeafFiles;
        }

        // prevent move if the same
        if (
          sourceDir === targetDir ||
          sourceDir === `${targetDir}/${sourceDir.split("/").pop()}`
        ) {
          return prevLeafFiles;
        }

        const baseNameToMove = sourceDir.split("/").pop() || "file";
        let newDir = `${targetDir}/${baseNameToMove}`;

        const handleConflict = (
          baseName: string,
          extension: string | undefined
        ) => {
          const newName = generateUniqueName(baseName, targetDir, extension);
          return extension
            ? `${targetDir}/${newName}.${extension}`
            : `${targetDir}/${newName}`;
        };

        // auto-rename file
        if (prevLeafFiles.some((file) => file.dir === newDir)) {
          const baseName = baseNameToMove.split(".")[0];
          const extension = baseNameToMove.includes(".")
            ? baseNameToMove.split(".").pop()
            : undefined;
          newDir = handleConflict(baseName, extension);
        }

        // auto-rename dir
        if (
          prevLeafFiles.some(
            (file) => file.dir.startsWith(newDir) && !newDir.includes(".")
          )
        ) {
          const baseName = baseNameToMove;
          newDir = handleConflict(baseName, undefined);
        }

        const updatedLeafFiles = prevLeafFiles.map((file) => {
          if (file.dir === sourceDir || file.dir.startsWith(`${sourceDir}/`)) {
            const newSubDir = file.dir.replace(sourceDir, newDir);
            return { ...file, dir: newSubDir };
          }
          return file;
        });

        const filteredLeafFiles = updatedLeafFiles.filter(
          (file) => !file.dir.startsWith(sourceDir)
        );

        return filteredLeafFiles.sort((a, b) => a.dir.localeCompare(b.dir));
      });
    },
    [leafFiles, currentSchema]
  );

  const onPaste = useCallback(
    (target: FTree) => {
      if (!copiedFile) {
        return;
      }

      const targetDir = target.dir;
      const isDirectory = !copiedFile.includes(".");

      if (isDirectory) {
        const filesToCopy = leafFiles.filter(
          (file) =>
            file.dir === copiedFile || file.dir.startsWith(`${copiedFile}/`)
        );

        if (filesToCopy.length === 0) {
          return;
        }

        const baseNameToCopy = copiedFile.split("/").pop() || "directory";
        let newDir = `${targetDir}/${baseNameToCopy}`;

        // auto-rename dir
        if (leafFiles.some((file) => file.dir.startsWith(newDir))) {
          const baseName = generateUniqueName(
            baseNameToCopy,
            targetDir,
            undefined
          );
          newDir = `${targetDir}/${baseName}`;
        }

        setLeafFiles((prevLeafFiles) => {
          const newFiles = filesToCopy.map((file) => {
            const relativePath = file.dir.replace(copiedFile, "");
            return {
              ...file,
              dir: `${newDir}${relativePath}`,
            };
          });

          return [...prevLeafFiles, ...newFiles].sort((a, b) =>
            a.dir.localeCompare(b.dir)
          );
        });
      } else {
        const copiedFileObj = leafFiles.find((f) => f.dir === copiedFile);
        if (!copiedFileObj) return;

        const baseNameToCopy = copiedFile.split("/").pop() || "file";
        const extension = baseNameToCopy.includes(".")
          ? baseNameToCopy.split(".").pop()
          : "";

        let newDir = `${targetDir}/${baseNameToCopy}`;

        // auto-rename file
        if (leafFiles.some((file) => file.dir === newDir)) {
          let baseName = baseNameToCopy.split(".")[0];
          baseName = generateUniqueName(baseName, targetDir, extension || "");
          newDir = `${targetDir}/${baseName}`;
        }

        if (extension && !newDir.endsWith(`.${extension}`)) {
          newDir += `.${extension}`;
        }

        setLeafFiles((prevLeafFiles) => [
          ...prevLeafFiles,
          { ...copiedFileObj, dir: newDir },
        ]);
      }

      setCopiedFile("");
    },
    [copiedFile, leafFiles]
  );

  const onRename = useCallback(
    (oldPath: FTree, newPath: FTree) => {
      let newDir = newPath.dir;
      if (!newDir.includes("/")) {
        newDir = oldPath.dir.split("/").slice(0, -1).join("/") + "/" + newDir;
      }

      if (leafFiles.some((file) => file.dir === newDir)) {
        console.warn("A file or directory with this name already exists.");
        return;
      }

      const updatedLeafFiles = leafFiles.map((file) => {
        if (file.dir === oldPath.dir) {
          return { ...file, dir: newDir };
        }

        if (file.dir.startsWith(`${oldPath.dir}/`)) {
          const relativePath = file.dir.slice(oldPath.dir.length);
          return { ...file, dir: `${newDir}${relativePath}` };
        }
        return file;
      });

      setLeafFiles(updatedLeafFiles.sort((a, b) => a.dir.localeCompare(b.dir)));

      if (currentSchema === oldPath.dir) {
        setCurrentSchema(newDir);
      }
    },
    [leafFiles, currentSchema]
  );

  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        alignSelf: "stretch",
        display: "flex",
        position: "relative",
      }}
    >
      <GraphQLEditor
        leafs={{
          schemas: leafFiles,
          onClick: (f) => {
            setCurrentSchema(f.dir);
          },
          onDelete: (f) => {
            console.log({ f, leafFiles });
            if (f.dir === currentSchema) {
              setCurrentSchema("");
            }
            setLeafFiles((lf) => lf.filter((l) => l.dir !== f.dir));
          },
          onCopy: (f) => {
            setCopiedFile(f.dir);
          },
          onPaste,
          onRename,
          onAdd: (d) => {
            setLeafFiles((lf) => [...lf, { content: "", dir: d.dir }]);
          },
          onMove,
          copiedFile,
          current: currentSchema,
        }}
        path="libraries"
        setSchema={(props) => {
          setMySchema(props);
        }}
        schema={mySchema}
      />
    </div>
  );
};

MergedLibraries.description = "Merged libraries with nodes with same names";
