import { Billboard as BillboardType } from "@/types";

interface BillboardProps {
  data: BillboardType | null;
  name?: string;
}

const Billboard = ({ data, name }: BillboardProps) => {
  if (!data) {
    return (
      <div className="p-4 overflow-hidden sm:p-6 lg:p-8 rounded-xl">
        <div
          className="rounded-xl relative aspect-square md:aspect-[2.4/1] bg-no-repeat overflow-hidden"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1549921613-8db30562bad1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
          }}
        >
          <div className="flex flex-col items-center justify-center w-full h-full text-center gap-y-8">
            <div className="max-w-xs text-3xl font-bold sm:text-5xl lg:text-6xl sm:max-w-xl">
              {name}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 overflow-hidden sm:p-6 lg:p-8 rounded-xl">
      <div
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${data?.image_url})` }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full text-center gap-y-8">
          <div className="max-w-xs text-3xl font-bold sm:text-5xl lg:text-6xl sm:max-w-xl">
            {data?.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
