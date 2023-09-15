import React, { useState } from "react";
import { PassedSchema } from "graphql-editor";
import * as schemas from "../schema";
import { GraphQLGqlEditor } from "graphql-editor";

export const GqlSaleor = () => {
  const [mySchema] = useState<PassedSchema>({
    code: schemas.saleor,
    libraries: "",
    source: "outside",
  });
  const [gql, setGql] = useState("");
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
      <GraphQLGqlEditor gql={gql} setGql={(e) => setGql(e)} schema={mySchema} />
    </div>
  );
};
GqlSaleor.description = "GQL for schema of a big e-commerce service Saleor.";
