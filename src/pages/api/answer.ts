// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

function genAnswerInfo(reqBody: any) {
  const answerList: any[] = [];
  Object.keys(reqBody).forEach((key) => {
    answerList.push({ componentId: key, value: reqBody[key] });
  });
  return {
    questionId: reqBody.questionId || "",
    answerList,
  };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // console.log("method", req.method);
  // res.status(200).json({ name: "" });
  if (req.method !== "POST") {
    //不是POST返回错误
    res.status(200).json({ errno: -1, msg: "Method 错误" });
  }
  console.log("req.body", req.body);

  //提交到服务器MOCK

  res.status(200).json({ errno: 0 });
}
