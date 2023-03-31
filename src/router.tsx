import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import ProtectedRoute from './components/ProtectedRoutes';


const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Pages

const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards

const DashboardIndex = Loader(lazy(() => import('src/pages/Components/Dashboard/DashboardIndex')))

// creator
const CreatorIndex = Loader(lazy(() => import('src/pages/Components/MusicCreator/CreateMusicCreator')))

const ViewMusicCreator = Loader(lazy(() => import('src/pages/Components/MusicCreator/View/ViewMusicCreator')))
const CreateCelebrity = Loader(lazy(() => import('src/pages/Components/Celebrity/CreateCelebrityIndex')))

const Celebrities = Loader(lazy(() => import('src/pages/Components/Celebrity/ViewCelebrities')))
// Applications

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

// Components

const Buttons = Loader(
  lazy(() => import('src/pages/Components/Buttons'))
);
const Modals = Loader(
  lazy(() => import('src/pages/Components/Modals'))
);
const Accordions = Loader(
  lazy(() => import('src/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('src/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('src/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('src/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('src/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/pages/Components/Forms')));

// Status


// Register
const Login = Loader(lazy(() => import('src/pages/Components/Register/Login')))

const Status404 = Loader(
  lazy(() => import('src/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/pages/Status/Maintenance'))
);



const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <ProtectedRoute>
      <SidebarLayout />
    </ProtectedRoute>,
    children: [
      {
        path: '/',
        element: <Transactions />
      },
      {
        path: '/Add-Music-Creator',
        element: <CreatorIndex />
      },
      {
        path: '/create-music-creator?edit=true/:userId',
        element: <CreatorIndex />
      },
      // {
      //   path: 'status',
      //   children: [
      //     {
      //       path: '',
      //       element: <Navigate to="404" replace />
      //     },
      //     {
      //       path: '404',
      //       element: <Status404 />
      //     },
      //     {
      //       path: '500',
      //       element: <Status500 />
      //     },
      //     {
      //       path: 'maintenance',
      //       element: <StatusMaintenance />
      //     },
      //     {
      //       path: 'coming-soon',
      //       element: <StatusComingSoon />
      //     }
      //   ]
      // },
      {
        path: '/view-music-creators',
        element: <ProtectedRoute>
          <ViewMusicCreator />
        </ProtectedRoute>
      }, {
        path: '/create-celebrity',
        element: <CreateCelebrity />
      }, {
        path: '/celebrities',
        element: <Celebrities />
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="crypto" replace />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      }
    ]
  }
];

export default routes;
