import React from 'react';
/* import App from './App'; */
import ConnectedApp, { App } from '../App'
import Header from '../Components/Header';
import { MemoryRouter } from 'react-router';
import { configure, shallow, mount  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux'
import store from '../store'
import { BrowserRouter as Router } from 'react-router-dom'

configure({ adapter: new Adapter() });

describe('<Header />', () => {
  it('should render Header ', () => {
    const wrapper = shallow(
       <Provider store={store}>
        <Header />
      </Provider>
    );
    console.log('shallow', wrapper.debug());
  })

  it('matches the snapshot', () => {
    const tree = shallow(
      <Provider store={store}>
      <Header />
    </Provider>
    )
     expect(tree).toMatchSnapshot()
   })

   

})
