import React from "react";
import styles from "./style.module.less";
import { voteUpsert, voteList } from "@/server/vote";
import { checkOnlion } from "@/server/user";

const New = () => {
  const add = () => {
    voteUpsert({
      title: "aaa",
      content: "bbb",
      status: 1,
      options: [{ content: "opt1" }, { content: "opt2" }],
    }).then((res) => {
      console.log(res);
    });
  };
  const add1 = () => {
    checkOnlion().then((res) => {
      console.log(res);
    });
  };
  const add2 = () => {
    voteList({ p: 1, s: 10 }).then((res) => {
      console.log(res);
    });
  };
  return (
    <div>
      <button onClick={add}>addVote</button>
      <button onClick={add1}>checkOnlion</button>
      <button onClick={add2}>voteList</button>
    </div>
  );
};

New.getInitialProps = () => {
  return { tzz: 1 };
};

export default New;
