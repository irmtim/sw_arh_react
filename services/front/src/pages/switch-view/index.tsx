import { APP_URL, DataTable, PageLink, PageTitle, QueryRequestProvider, QueryResponseProvider, SearchComponent, useQueryRequest, useQueryResponse } from "shared";
import { dataTableColumns } from "./ui/dataTableColumns";
import { useParams } from "react-router-dom";
import { QUERIES, getAll } from "./api/requests";



const breadcrumbs: PageLink[] = [
  {
    icon: 'home',
    path: APP_URL.INDEX,
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
  {
    title: 'Коммутаторы',
    path: APP_URL.SWITCHES_INDEX,
    isSeparator: false,
    isActive: false,
  },
]

type Props = {
  ip: string
}

const Grid = ({ip}: Props) => {
  const request = useQueryRequest()
  const response = useQueryResponse()

  

  // const navigate = useNavigate()

  // const click = (data: ISwitch) => navigate(APP_URL.SWITCHES_VIEW(data.ip)) 
  
  return (
    <>
      <PageTitle
        breadcrumbs={breadcrumbs} 
        toolBarActions={<SearchComponent queryRequest={request} size="sm"/>}>{ip}</PageTitle>
      <DataTable queryResponse={response} dataTableColumns={dataTableColumns(ip)} hover={true}/>
    </>
    
  );
};

const SwitchViewPage = () => {
  const {ip} = useParams()

  return (
    <>
      <QueryRequestProvider requestName={QUERIES.DETAILS}>
        <QueryResponseProvider getRequest={(query: any) => getAll(query, ip!)} requestName={QUERIES.DETAILS}>
          <Grid ip={ip!}/>
        </QueryResponseProvider>
      </QueryRequestProvider>
    </>
  );
};

export default SwitchViewPage