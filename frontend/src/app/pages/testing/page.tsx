import api from '@service/api';
import _api from '@utils/api';
import dayjs from 'dayjs';
import React from 'react'

async function getServerSideProps() {
  // return { p: _api("/v1/asset") };

  const response = await api.asset.getAssets();
  // return response;
  const data = response.data;

  return data;
  // return {name:"123"}
}

const page: React.FC = async () => {
  const data = await getServerSideProps();
  return (
    <div>page test {JSON.stringify(data)}</div>
  )
}

export default page
