'use client';

export default function EditButton({ children, bg }: any) {
  return (
    <div className="w-11/12 h-12 bg-main flex justify-center items-center rounded-full absolute bottom-10 ml-5">
      <button className="text-white">{children}</button>
    </div>
  );
}
