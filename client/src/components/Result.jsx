import { useMyContext } from '../context/FormContext';

export const Result = () => {
  const { data, status, loading } = useMyContext();

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : data && data.length > 0 ? (
        <div>
          {data.map((item, index) => (
            <div key={index}>
              <p>{item.email}</p>
              <p>{item.number}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>{status}</p>
      )}
    </div>
  );
};
