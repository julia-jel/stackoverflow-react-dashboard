import React from 'react';
import * as _ from 'lodash';
import '../styles.css';

// импортируем компоненты:
import Post from "./Post";
import SortingButton from "./SortingButton";

//внешняя функция, чтобы отфильтровать посты и сортировать их по дате создания:

const filterAndSortPosts = function(array) {
  var newArray = _
  .chain(array)
  .filter((i) => (i.is_answered == true && i.owner.reputation >= 50))
  .sortBy("creation_date")
  .value();
  return newArray;
};

//Компонент с колонкой отфильтрованных постов и кнопкой для сортировки:

class ReactPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: undefined,
      sortingOrder: "down"
    };
    this.handleClick = this.handleClick.bind(this)
  }
  
  //загружаем данные из API до загрузки компонента:
  componentDidMount() {
    var that = this;
    document.addEventListener('DOMContentLoaded', function() {
       var req = new XMLHttpRequest();
       var status = false;
       req.open("GET", 'https://api.stackexchange.com/2.2/search?intitle=react&site=stackoverflow', true);
       req.onload=function(){
         if (req.readyState == 4 && req.status == 200) {
           var json = JSON.parse(req.responseText);
           status = true;
           //создаем переменную, содержащую только массив данных о постах:
           var posts=json.items;
           //фильтруем и сортируем посты по дате создания; записываем в состояние компонента вместе с направлением сортировки:
           that.setState({
             dataset: filterAndSortPosts(posts),
             sortingOrder: "up"
           });
         } else {
           console.error(req.statusText)
         }  
       };
       req.onerror = function(error){
         console.error(req.statusText);
       }
       req.send();
    })
  }
  
  //метод для переключения направления сортировки:
  handleClick() {
    //функция для быстрой смены состояния:
    const toggleOrder = function(order) {
      return (order === "up") ? "down" : "up"
    };
    //реверсируем массив с данными и меняем направление сортировки:
    this.setState({
      dataset: _.reverse(this.state.dataset),
      sortingOrder: toggleOrder(this.state.sortingOrder)
    })
  }
  
  render() {
    //Если данные загрузились и состояние компонента определено, создаем JSX-элемент для каждого поста и записываем в переменную:
    let renderedPosts = [];   
    if (this.state.dataset) {
      renderedPosts = _.map(this.state.dataset, (item, index) => (<Post id={index} link={item.link} date={item.creation_date} imgSrc={item.owner.profile_image} title={item.title} />));
    
    //рендерим кнопку для смены направления сортировки и собственно массив с постами:
      return (
        <div id="posts-column" class="container-fluid">         
          <SortingButton id="sort-button" title="Sort by date" class="btn btn-primary" handleClick={this.handleClick} direction={this.state.sortingOrder} />         
          {renderedPosts}
        </div>
      )
      
      //Если данные еще не загрузились и состояние не определено, пишем loading:    
    } else {  
      return (
        <div id="loading">
          Loading...
        </div>
      )      
    }
  }
}

export default ReactPosts;
