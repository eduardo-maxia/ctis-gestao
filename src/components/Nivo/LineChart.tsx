import { ResponsiveLine } from '@nivo/line'

const data = [
  {
    "id": "japan",
    "color": "hsl(306, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 148
      },
      {
        "x": "helicopter",
        "y": 226
      },
      {
        "x": "boat",
        "y": 95
      },
      {
        "x": "train",
        "y": 126
      },
      {
        "x": "subway",
        "y": 50
      },
      {
        "x": "bus",
        "y": 39
      },
      {
        "x": "car",
        "y": 92
      },
      {
        "x": "moto",
        "y": 63
      },
      {
        "x": "bicycle",
        "y": 232
      },
      {
        "x": "horse",
        "y": 288
      },
      {
        "x": "skateboard",
        "y": 33
      },
      {
        "x": "others",
        "y": 144
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(252, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 47
      },
      {
        "x": "helicopter",
        "y": 250
      },
      {
        "x": "boat",
        "y": 189
      },
      {
        "x": "train",
        "y": 172
      },
      {
        "x": "subway",
        "y": 153
      },
      {
        "x": "bus",
        "y": 243
      },
      {
        "x": "car",
        "y": 225
      },
      {
        "x": "moto",
        "y": 209
      },
      {
        "x": "bicycle",
        "y": 133
      },
      {
        "x": "horse",
        "y": 218
      },
      {
        "x": "skateboard",
        "y": 286
      },
      {
        "x": "others",
        "y": 161
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(90, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 94
      },
      {
        "x": "helicopter",
        "y": 125
      },
      {
        "x": "boat",
        "y": 144
      },
      {
        "x": "train",
        "y": 107
      },
      {
        "x": "subway",
        "y": 36
      },
      {
        "x": "bus",
        "y": 37
      },
      {
        "x": "car",
        "y": 245
      },
      {
        "x": "moto",
        "y": 188
      },
      {
        "x": "bicycle",
        "y": 153
      },
      {
        "x": "horse",
        "y": 62
      },
      {
        "x": "skateboard",
        "y": 105
      },
      {
        "x": "others",
        "y": 56
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(138, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 101
      },
      {
        "x": "helicopter",
        "y": 280
      },
      {
        "x": "boat",
        "y": 249
      },
      {
        "x": "train",
        "y": 90
      },
      {
        "x": "subway",
        "y": 276
      },
      {
        "x": "bus",
        "y": 229
      },
      {
        "x": "car",
        "y": 99
      },
      {
        "x": "moto",
        "y": 123
      },
      {
        "x": "bicycle",
        "y": 105
      },
      {
        "x": "horse",
        "y": 240
      },
      {
        "x": "skateboard",
        "y": 189
      },
      {
        "x": "others",
        "y": 233
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(147, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 45
      },
      {
        "x": "helicopter",
        "y": 170
      },
      {
        "x": "boat",
        "y": 35
      },
      {
        "x": "train",
        "y": 192
      },
      {
        "x": "subway",
        "y": 11
      },
      {
        "x": "bus",
        "y": 83
      },
      {
        "x": "car",
        "y": 72
      },
      {
        "x": "moto",
        "y": 133
      },
      {
        "x": "bicycle",
        "y": 21
      },
      {
        "x": "horse",
        "y": 177
      },
      {
        "x": "skateboard",
        "y": 81
      },
      {
        "x": "others",
        "y": 264
      }
    ]
  }
]

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const MyResponsiveLine = () => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: true,
      reverse: false
    }}
    yFormat=" >-.2f"
    // axisBottom={{
    //   orient: 'bottom',
    //   tickSize: 5,
    //   tickPadding: 5,
    //   tickRotation: 0,
    //   legend: 'transportation',
    //   legendOffset: 36,
    //   legendPosition: 'middle'
    // }}
    // axisLeft={{
    //   orient: 'left',
    //   tickSize: 5,
    //   tickPadding: 5,
    //   tickRotation: 0,
    //   legend: 'count',
    //   legendOffset: -40,
    //   legendPosition: 'middle'
    // }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
  />
)

export default function MyLine() {

}