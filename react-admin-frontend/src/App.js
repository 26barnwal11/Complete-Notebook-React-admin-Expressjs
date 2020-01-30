import React from 'react';
import { Admin, Resource } from 'react-admin';
import { PostList , PostEdit , PostCreate} from './list';
import jsonServerProvider from 'ra-data-json-server';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
const dataProvider = jsonServerProvider('http://localhost:3010');
const App = () => (
      <Admin dashboard={Dashboard} authProvider={authProvider}  dataProvider={dataProvider}>
          <Resource name="list" list={PostList} edit={PostEdit} create={PostCreate} />
      </Admin>
  );
export default App;