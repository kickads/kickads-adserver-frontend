import { Suspense, useEffect } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { queryClient } from '../../../providers/ReactQueryProvider.tsx';
import { Loader } from '../../../components/Loader/Loader.tsx';
import { db } from '../../../config/firebase/firebase.config.ts';

interface Data {
  clients: string[]
}

export function CreativesHome() {
  const { clients } = useLoaderData() as Data;

  useEffect(() => {

    getAllForTable().then(() => {
    });

  }, []);

  return (
    <>
      <Suspense fallback={ <Loader className="h-6 stroke-slate-300 animate-spin mx-auto" /> }>
        <Await resolve={ clients }>
          {
            (clients) => (
              // <span className="text-white">{ JSON.stringify(clients.data().clients) }</span>
              <ul className="text-white capitalize">
                {
                  clients.data().clients.map((client: string) => <li key={ client }>{ client }</li>)
                }
              </ul>
            )
          }
        </Await>
      </Suspense>
    </>
  );
}

export async function getAllClientsLoader() {
  const queryForClients = doc(db, 'creatives', 'clients');

  return defer({
    clients: queryClient.fetchQuery({
      queryKey: [ 'clients' ],
      queryFn: () => getAllClients(queryForClients)
    })
  })
}

async function getAllClients(queryForClients: any) {
  return await getDoc(queryForClients);
}

async function getAllForTable() {
  const querySnapshot = await getDocs(collection(db, 'creatives'));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });

  // if (data.exists()) {
  //   const clients = data.data().clients;
  //
  //   clients.forEach((client: string)=> {
  //     const queryForCreatives = doc(db, 'creatives', `data/${ client }/data`);
  //     getDocument(queryForCreatives).then(r => {
  //       console.log(r.data());
  //     })
  //   });
  // }
}