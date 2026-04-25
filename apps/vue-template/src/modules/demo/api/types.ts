export interface DemoTask {
  id: number;
  name: string;
  owner: string;
  status: string;
}

export interface DemoTaskResponse {
  duration: number;
  items: DemoTask[];
  status: '200 OK';
}
