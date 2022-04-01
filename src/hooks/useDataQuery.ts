import { useQuery } from 'react-query';

import axios from 'axios';
import mockData from '@/assets/data.json';
import { Data } from '@/types';

const useDataQuery = (useMockData: boolean) => {
  const mockFn = async (): Promise<unknown> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData);
      }, 500);
    });
  };

  const fetchFn = async (): Promise<Data> => {
    try {
      const url = `http://localhost:5000/api/Data`;
      const res = await axios.get(url);
      return res.data;
    } catch (e) {
      throw e;
    }
  };

  return useQuery('data', useMockData ? mockFn : fetchFn);
};

export default useDataQuery;
