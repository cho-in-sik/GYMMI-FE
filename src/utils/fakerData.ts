import { IWorkspace, IWorkspaceDetail } from '@/types/workSpace';
import { faker } from '@faker-js/faker';

//워크스페이스 목록
const workspaceList = (): IWorkspace => ({
  id: faker.number.int({ min: 1, max: 100 }),
  name: faker.commerce.product(),
  creator: faker.person.firstName(),
  status: '진행중',
  createdAt: faker.date.anytime(),
  achievementRate: faker.number.int(100),
  tag: '헬스, 필라테스',
  taskScore: faker.number.int({ min: 10, max: 1000 }),
  title: faker.lorem.words().substring(2, 9),
});

// 하나의 워크스페이스 객체 생성
const generateWorkspace = (): IWorkspaceDetail => ({
  creator: faker.number.int({ min: 1, max: 100 }), // 1에서 100 사이의 랜덤 사용자 ID
  name: faker.commerce.product(), // 랜덤 회사 이름
  headCount: faker.number.int({ min: 1, max: 9 }), // 1에서 50 사이의 랜덤 인원수
  goalScore: faker.number.int({ min: 100, max: 1000 }), // 100에서 1000 사이의 랜덤 목표 점수
  description: faker.lorem.sentence(), // 랜덤 설명 문장
  missionBoard: [
    {
      mission: `데드리프트 ${faker.number.int({ min: 1, max: 20 })}회`,
      score: faker.number.int({ min: 1, max: 10 }),
    },
    {
      mission: `달리기 ${faker.number.int({ min: 1, max: 60 })}분`,
      score: faker.number.int({ min: 1, max: 10 }),
    },
    {
      mission: `벤치프레스 ${faker.number.int({ min: 1, max: 60 })}분`,
      score: faker.number.int({ min: 1, max: 10 }),
    },
  ],
  task: faker.lorem.sentence(), // 랜덤 작업 문장
});

// 여러 개의 워크스페이스 객체 배열 생성
export const generateWorkspaceDetails = (count: number): IWorkspaceDetail[] => {
  const workspaces: IWorkspaceDetail[] = [];
  for (let i = 0; i < count; i++) {
    workspaces.push(generateWorkspace());
  }
  return workspaces;
};
export const generateWorkspaces = (count: number): IWorkspace[] => {
  const workspaces: IWorkspace[] = [];
  for (let i = 0; i < count; i++) {
    workspaces.push(workspaceList());
  }
  return workspaces;
};
