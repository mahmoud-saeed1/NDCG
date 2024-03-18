import { TableHTMLAttributes } from "react";
import { gainColors } from "../data";

interface ITable extends TableHTMLAttributes<HTMLTableElement> {
  inputData: { [key: string]: string };
}
const Table = (inputData: ITable) => {
  return (
    <table className="w-full mt-16 bg-white shadow-lg rounded-lg">
      <thead>
        <tr className="bg-gradient-to-r from-purple-600 to-blue-600">
          <th className="py-4 px-6 text-white font-bold uppercase">Rank</th>
          <th className="py-4 px-6 text-white font-bold uppercase">Gains</th>
          <th className="py-4 px-6 text-white font-bold uppercase">NDCG</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(inputData).map((value, index) => (
          <tr
            key={index}
            className={`${
              index % 2 === 0 ? "bg-blue-100" : ""
            } text-lg font-semibold`}
          >
            <td
              className={`${
                index !== 0
                  ? gainColors[index % gainColors.length]
                  : "bg-red-500"
              } py-3 px-6 text-center text-white font-medium"`}
            >
              {index + 1}
            </td>
            <td className={`py-3 px-6 text-center text-blue-900 font-medium"`}>
              {Number(value)}
            </td>
            <td className={`py-3 px-6 text-center text-blue-900 font-medium"`}>
              {index + 1}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
