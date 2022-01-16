import React, { useContext } from "react";
import { IContext, SProps } from "ssr-types-react";
import {
  Ddata,
  RecommendDataNode,
  PlayerDataNode,
  BriefDataNode,
} from "~/typings/data";
import { STORE_CONTEXT } from "_build/create-context";

import { XXXStore } from "@/model";
import { Provider, useStore } from "reto";

export default function Detail(props: SProps) {
  const { state, dispatch } = useContext<IContext<Ddata>>(STORE_CONTEXT);
  return (
    <div>
      
    </div>
  );
}
