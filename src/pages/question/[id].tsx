import Head from "next/head";
import styles from "@/styles/Question.module.scss";

type PropsType = {
  id: string;
};

import QuestionInput from "@/components/QuestionComponents/QuestionInput";
import QuestionRadio from "@/components/QuestionComponents/QuestionRadio";

// pages/question/[id].tsx
// http://localhost:3000/question/12353   C端H5的页面url规则

export default function Question(props: PropsType) {
  return (
    <>
      <Head>
        <title>Question</title>
        <meta name="description" content="Question page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <form action='/api/answer'>
          <input
            type="hidden"
            name="questionId"
            defaultValue={props.id}
          ></input>
          <div className={styles.componentWrapper}>
            <QuestionInput
              fe_id="c1"
              props={{ title: "你的姓名", placeholder: "请输入姓名" }}
            ></QuestionInput>
          </div>
          <div className={styles.componentWrapper}>
            <QuestionRadio
              fe_id="c2"
              props={{
                title: "你的性别",
                options: [
                  { value: "male", text: "男" },
                  { value: "female", text: "女" },
                ],
                value: "",
                isVertical: false,
              }}
            ></QuestionRadio>
          </div>

          <div className={styles.submitBtnContainer}>
            {/* <input type="submit" value="提交" /> */}
            <button type="submit">提交</button>
          </div>
        </form>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { id = "" } = context.params;
  //根据id await获取问卷数据
  return {
    props: {
      id,
      //其他数据
    },
  };
}
