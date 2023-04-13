import qs from 'qs';
import categoryList from './fixtures/category.json';
import requests from './httpJJmallServices';

// complete _id to every value
let fakeCategory = categoryList.map((category, index) => ({_id: index.toString(), ...category}));
let headers = {
  Authorization: 'Bearer ',
  'Content-Type': 'application/json',
};
const CategoryServices = {
  getShowingCategory() {
    const queryObj = {populate: ['children', 'parent', 'icon'], filters: {is_validated: true}};
    const query = qs.stringify(queryObj, {encodeValuesOnly: true});

    return requests.get(`/categories?${query}`);
  },

  createCategory(formValue) {
    return requests.post('/categories', {data: formValue}, headers);
  },

  getAllCategory() {
    const queryObj = {populate: ['children', 'parent','icon'], filters: {is_validated: true}};
    const query = qs.stringify(queryObj, {encodeValuesOnly: true});
    return requests.get(`/categories?${query}`);
    //.then((res) => { data = res.data });
    //console.log(data.data)
    // return  data
    // requests.get('/categories').then((res) => {
    //   fakeCategory = res.data
    // }).catch(e => console.log(e))
    // return fakeCategory;
  },
};

export default CategoryServices;
