import { ISwitch } from "entities/switch"
import { Column } from "react-table"
import { CustomHeader, DateCell, SimpleValueCell } from "shared"

const dataTableColumns = (): ReadonlyArray<Column<ISwitch>> =>  [
  {
    Header: (props) => <CustomHeader tableProps={props} title='IP' className='min-w-md-200px' />,
    id: 'ip',
    Cell: ({ ...props }) => <SimpleValueCell value={props.data[props.row.index].ip} className="min-w-md-200px"/>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Модель' className='min-w-125px' />,
    id: 'model',
    Cell: ({ ...props }) => <SimpleValueCell value={props.data[props.row.index].model}/>,
  },
  
  {
    Header: (props) => <CustomHeader tableProps={props} title='Серийный номер' className='min-w-125px' />,
    id: 'serial',
    Cell: ({ ...props }) => <SimpleValueCell value={props.data[props.row.index].serial}/>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Создан' className='min-w-100px text-end' />,
    id: 'created_on',
    Cell: ({ ...props }) => <DateCell date={props.data[props.row.index].created_on} dateFormat="DD/MM/YYYY" className="text-end"/>,
  },
]

export { dataTableColumns }