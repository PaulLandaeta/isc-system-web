import { useEffect, useState } from 'react';
import { getDefenseDetail } from '../services/defenseDetail';

interface DefenseResponse {
  success: boolean;
  message: string;
  error: string | null;
  code: number;
  data?: unknown;
}

const useDefenseExternalDetail = (processId: number) => {
  const [defenseDetail, setDefenseDetail] = useState<DefenseResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await getDefenseDetail(processId, 'external');
        setDefenseDetail(response);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (processId) {
      fetchDetail();
    }
  }, [processId]);

  return { defenseDetail, loading, error };
};

export default useDefenseExternalDetail;
