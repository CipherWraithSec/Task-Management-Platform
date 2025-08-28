import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen w-full">
      <div className="m-auto">
        <h1 className="text-4xl font-bold">
          Welcome to the Task Management Platform
        </h1>
        <p className="mt-4">Organize and manage your tasks efficiently.</p>
      </div>
    </div>
  );
}
