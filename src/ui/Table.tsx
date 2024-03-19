import { TableHTMLAttributes } from "react";
import { gainColors } from "../data";
import { getNdcg } from "../utils";

interface ITable extends TableHTMLAttributes<HTMLTableElement> {
  inputData: { gain: number; rank: number }[];
  caption?: string;
  tableHeads: string[];
}
const Table = ({ inputData, caption, tableHeads }: ITable) => {
  // Calculate total ndcg
  const totalNdcg = inputData.reduce((acc, item, index) => {
    const ndcgValue = getNdcg(item.gain, index + 1); // Call getNdcg with the entire item
    return ndcgValue ? acc + ndcgValue : acc; // Add valid ndcg values
  }, 0);

  return (
    <table className="w-full mt-16 bg-white shadow-lg rounded-lg">
      {caption && <caption className="caption-top">{caption}</caption>}
      <thead>
        <tr className="bg-gradient-to-r from-purple-600 to-blue-600">
          <th className="py-4 px-6 text-white font-bold uppercase">
            {tableHeads[0]}
          </th>
          <th className="py-4 px-6 text-white font-bold uppercase">
            {tableHeads[1]}
          </th>
          <th className="py-4 px-6 text-white font-bold uppercase">
            {tableHeads[2]}
          </th>
        </tr>
      </thead>

      <tbody>
        {inputData.map((item, index) => {
          return (
            <tr
              key={index + 1}
              className="even:bg-blue-100 text-lg font-semibold"
            >
              <td
                className={`py-3 px-6 text-center text-blue-900 font-medium"`}
              >
                {index + 1}
              </td>
              <td
                className={`${
                  item.gain !== 10
                    ? gainColors[item.gain % gainColors.length]
                    : "bg-green-950"
                } py-3 px-6 text-center text-white font-medium"`}
              >
                {item.gain}
              </td>
              <td
                className={`py-3 px-6 text-center text-blue-900 font-medium"`}
              >
                {getNdcg(item.gain, index + 1)}
              </td>
            </tr>
          );
        })}
      </tbody>

      <tfoot className="text-lg font-semibold uppercase">
        <tr>
          <td>total ndcg</td>
          <td></td>
          <td>{totalNdcg.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
