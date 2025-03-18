import { TableHeader } from "@/core/types/interface/component/table";

export default function TableLoading<T = unknown>(props: { headers: TableHeader<T>[] }) {
  const { headers } = props;

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      <tr>
        {headers?.map((item) => (
          <td key={item.field} className="px-6 py-4 whitespace-nowrap">
            <div className="bg-gray-400 animate-pulse h-[0.5rem] w-full "></div>
          </td>
        ))}
      </tr>
    </tbody>
  );
}
