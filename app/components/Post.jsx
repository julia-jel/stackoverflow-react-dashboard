import React from 'react';

//функция для конвертации даты из числового формата в секундах в строковый:

const convertDate = function(number) {
  var dateArr = new Date(number*1000).toString().split(" ");
  var dateStr = dateArr.slice(1, 5).join(" ");
  return dateStr;
}

//функция для конвертации закодированных значений JSON типа &quot; в обычный текст:

const decodeJSON = function(str) {
  var txt = document.createElement('textarea');
	txt.innerHTML = str;
	return txt.value;
}

//Компонент для отдельно взятого поста:

class Post extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    //Весь элемент является ссылкой на пост на сайте. Рендерим аватар пользователя, заголовок поста и конвертируем дату создания:
    return (
      <a className="post-link" href={this.props.link} target="_blank" title="View on Stackoverflow">
        <div id={this.props.id} className="post" date={this.props.date}>
          <img className="user-img" src={this.props.imgSrc} alt="user's image"/>
          <div className="post-title">
            {decodeJSON(this.props.title)}
            <div className="creation-date">{convertDate(this.props.date)}</div>
          </div>
        </div>
      </a>
    )
  }
}

export default Post;
