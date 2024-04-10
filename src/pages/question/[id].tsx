import PageWrapper from "@/components/PageWrapper";
import { getQuestionById } from "@/service/question";
import styles from "@/styles/Question.module.scss";

type PropsType = {
  errno: number;
  data?: {
    id: string;
    title: string;
    desc?: string;
    js?: string;
    css?: string;
    isPublished: boolean;
    isDeleted: boolean;
    componentList: Array<any>;
  };
  msg?: string;
};

import QuestionInput from "@/components/QuestionComponents/QuestionInput";
import QuestionRadio from "@/components/QuestionComponents/QuestionRadio";

// pages/question/[id].tsx
// http://localhost:3000/question/12353   C端H5的页面url规则

export default function Question(props: PropsType) {
  const { errno, data, msg = "" } = props;

  //errno可能不是0         数据错误
  if (errno !== 0) {
    return (
      <PageWrapper title="错误">
        <h1>错误</h1>
        <p>{msg}</p>
      </PageWrapper>
    );
  }
  const {
    id,
    title = "",
    isDeleted,
    desc,
    isPublished,
    componentList,
  } = data || {};
  // id 可能删除了
  if (isDeleted) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷已经被删除</p>
      </PageWrapper>
    );
  }
  // 没有发布等情况
  if (!isPublished) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷尚未发布</p>
      </PageWrapper>
    );
  }

  //遍历组件

  return (
    <PageWrapper title={title}>
      <form method="post" action="/api/answer">
        <input type="hidden" name="questionId" defaultValue={id}></input>
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
    </PageWrapper>
  );
}

export async function getServerSideProps(context: any) {
  const { id = "" } = context.params;
  //根据id await获取问卷数据
  const data = await getQuestionById(id);

  return {
    props: {
      ...data,
    },
  };
}
