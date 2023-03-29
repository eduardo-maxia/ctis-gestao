import { ResponsivePie } from '@nivo/pie'

const data = [
  {
    id: "Pix",
    label: "Pix",
    value: 195,
    color: "hsl(90, 70%, 50%)"
  },
  {
    id: "Cartão",
    label: "Cartão",
    value: 419,
    color: "hsl(56, 70%, 50%)"
  },
  {
    id: "Dinheiro",
    label: "Dinheiro",
    value: 407,
    color: "hsl(103, 70%, 50%)"
  }
];

export default function MyPie() {
  return (
    <div style={{ width: 300, height: 300 }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      />
    </div>
  );
}