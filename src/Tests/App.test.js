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

describe('<App />', () => {
  it('should render App', () => {
    const wrapper = shallow(
       <Provider store={store}>
        <App />
      </Provider>
     );
     console.log(wrapper.debug());
  })

  it('matches the snapshot', () => {
    const tree = shallow(
      <Provider store={store}>
      <App />
    </Provider>
    )
     expect(tree).toMatchSnapshot()
   })

   it('invalid path should redirect to 404', () => {
     const wrapper = mount(
        <MemoryRouter initialEntries={[ '/random' ]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
     )
      expect(wrapper.find(Header)).toHaveLength(0);
      expect(wrapper.find('#not-found')).toHaveLength(1);
   })

   it('valid path should not redirect to 404', () => {
    const wrapper = mount(
       <MemoryRouter initialEntries={[ '/' ]}>
         <Provider store={store}>
           <App />
         </Provider>
       </MemoryRouter>
    )
     expect(wrapper.find(Header)).toHaveLength(1);
     expect(wrapper.find('#not-found')).toHaveLength(0);
  })
})


