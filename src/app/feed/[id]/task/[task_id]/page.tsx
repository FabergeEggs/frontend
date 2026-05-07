import TaskPageClient from './client'

import { TaskStatusEnum } from "@/src/lib/models/export/project";
import { ResponseStatus } from "@/src/lib/models/export/response"

import { getTask } from '@/src/lib/api/project';



const data: Task = {
    task_id: "1",
    project_id: "1",
    creator_id: "asdasdas",
    label: "Перепись населения в Ижевске",
    creator: "Народный фольклор",
    short_description: "",
    description: `Надо срочно пересчитать жителей Ижевска. Посчитайте сколько народа живёт у вас в подъезде, укажите адрес для точности. Жителей Буммаша не считаем.\nБубубу лалал\nааааааааа`,
    created_at: new Date(),
    status: TaskStatusEnum.ACTIVE,
    answers_count: 3
}

const testResponseData: ResponseDTO = {
  id: "1",
  task_id: "1",
  user_id: "1",
  text: "Да, надо срочно пересчитать жителей Ижевска. Посчитайте сколько народа живёт у вас в подъезде, укажите адрес для точности. Жителей Буммаша не считаем.",
  status: ResponseStatus.ACCEPTED,
  attached_files: ["goida.txt", "goida.txt", "goida.txt"],
  created_at: "27.04.26 в 23:23",
  updated_at: "27.04.26 в 23:23",
}

const responses = [testResponseData, testResponseData, testResponseData]

export default async function Page({
  params,
}: {
  params: Promise<{ id: string, task_id: string }>;
}) {
  const { id, task_id } = await params;

  const data = await getTask(id, task_id) // <!> Plugging

  // const responses: ... = await ...

  return (
    <TaskPageClient data={data} responses={responses} />
  );
}
