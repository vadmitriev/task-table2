import { useQuery } from 'react-query';

import axios from 'axios';
import mockData from '@/assets/data.json';
import { Data } from '@/types';

const useDataQuery = (useMockData: boolean) => {
  const mockFn = async (): Promise<Data> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData as Data);
      }, 500);
    });
  };

  const fetchFn = async (): Promise<Data> => {
    try {
      const url = `http://localhost:5000/api/Data`;
      const { data } = await axios.get(url);
      return data;
    } catch (e) {
      throw e;
    }
  };

  return useQuery('data', useMockData ? mockFn : fetchFn, { refetchOnMount: false });
};

export default useDataQuery;
