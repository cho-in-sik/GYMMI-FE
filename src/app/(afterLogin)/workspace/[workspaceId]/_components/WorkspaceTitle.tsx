type TWorkspaceTitle = {
  name: string;
  workout: boolean;
};

function WorkspaceTitle({ name, workout }: TWorkspaceTitle) {
  return (
    <div className={`flex items-end ${workout && 'mb-8'}`}>
      <h1 className='font-galmuri text-[28px] ml-2'>{name}</h1>
    </div>
  );
}
export default WorkspaceTitle;
