import { lazy, Suspense, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import IndexRouter from './Router/IndexRouter'
import Loader from './Components/Fallback/Loader';
import HomeRouter from './Router/HomeRouter';
import ProposalRouter from './Router/ProposalRouter';
import ScreenProvider from './Context/ScreenProvider';
import AuthProvider from './Context/AuthProvider';




const NewBlock = lazy(() => import('./Pages/Proposal/ProposalPopUps/NewBlock'));
const NewGrapP = lazy(() => import('./Pages/Proposal/ProposalPopUps/NewGrapP'));
const NewVillage = lazy(() => import('./Pages/Proposal/ProposalPopUps/NewVillage'));
const NewFundSources = lazy(() => import('./Pages/Proposal/ProposalPopUps/NewFundSources'));
const Login = lazy(() => import('./Pages/Login'));
const PageNotFound = lazy(() => import('./Pages/PageNotFound'));
const AddProposal = lazy(() => import('./Pages/Proposal/AddProposal'));
const Communication = lazy(() => import('./Pages/Communication'));
const Letters = lazy(() => import('./Pages/Letters'));
const Setting = lazy(() => import('./Pages/Setting'));
const Funds = lazy(() => import('./Pages/Funds'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const Proposal = lazy(() => import('./Pages/Proposal/Proposal'));

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <ScreenProvider><AuthProvider><IndexRouter /></AuthProvider></ScreenProvider>,
      children: [
        {
          path: "",
          element: <HomeRouter />,
          children: [
            {
              path: "dashboard",
              element: <Suspense fallback={<Loader />}><Dashboard /> </Suspense>
            },
            {
              path: "proposals",
              element: <ProposalRouter />,
              children: [
                {
                  path: '',
                  element: <Suspense fallback={<Loader />}><Proposal /> </Suspense>,
                },
                {
                  path: 'NewProposal',
                  element: <Suspense fallback={<Loader />}><AddProposal /> </Suspense>,
                  children: [
                    {
                      index: true, 
                      element: null, //or <> </>
                    },
                    {
                      path: 'addBlock',
                      element: <Suspense fallback={<Loader />}><NewBlock /></Suspense>
                    },
                    {
                      path: 'addGp',
                      element: <Suspense fallback={<Loader />}><NewGrapP /></Suspense>
                    },
                    {
                      path: 'addVillage',
                      element: <Suspense fallback={<Loader />}><NewVillage /></Suspense>
                    },
                    {
                      path: 'addFundsources',
                      element: <Suspense fallback={<Loader />}><NewFundSources /></Suspense>
                    }
                  ]
                },
              ]
            },
            {
              path: "letters",
              element: <Suspense fallback={<Loader />}><Letters /> </Suspense>
            },
            {
              path: "funds",
              element: <Suspense fallback={<Loader />}><Funds /> </Suspense>
            },
            {
              path: "communications",
              element: <Suspense fallback={<Loader />}><Communication /> </Suspense>
            },
            {
              path: "settings",
              element: <Suspense fallback={<Loader />}><Setting /> </Suspense>
            }


          ]
        },
        {
          path: 'login',
          element: <Suspense fallback={<Loader />}><Login /></Suspense>
        },
        {
          path: '*',
          element: <Suspense fallback={<Loader />}><PageNotFound /></Suspense>
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
