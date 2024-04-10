import PageWrapper from "@/components/PageWrapper";
import { getQuestionById } from "@/service/question";
import { getComponent } from "@/components/QuestionComponents";
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
  const ComponentListElem = (
    <>
      {componentList?.map((c) => {
        const ComponentElem = getComponent(c);
        return (
          <div key={c.id} className={styles.componentWrapper}>
            {ComponentElem}
          </div>
        );
      })}
    </>
  );

  return (
    <PageWrapper title={title}>
      <form method="post" action="/api/answer">
        <input type="hidden" name="questionId" defaultValue={id}></input>

        {ComponentListElem}

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
