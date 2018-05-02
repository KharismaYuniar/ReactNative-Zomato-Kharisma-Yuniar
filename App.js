import React, { Component } from 'react';
import {
  Container,Header, Content,
  Footer,Thumbnail,Text,
  Icon,Button,Item,
  Input,View,Card,
  CardItem,List,ListItem,
  Left,Right,
  Body,} from 'native-base';
import { ScrollView,Image }from 'react-native'
import axios from 'axios';

class App extends Component{

  constructor(){
    super();
    this.state={makanan:[],menu:''};
  }

  klik(){
    var mn=this.state.menu;
    var url ='https://developers.zomato.com/api/v2.1/search?q='+mn;
    var config = {
      headers:{'user-key':'4ea94d5c78d7a306048f66daf88e6561'}
    };
    axios.get(url,config).then((ambilData)=>{
      console.log(ambilData.data);
      this.setState({
        makanan:ambilData.data.restaurants
      })
    })
  }
  
  componentDidMount(){
  }
  render() {
    const data=this.state.makanan.map((item,index)=>{
      var name=item.restaurant.name;
      var kota =item.restaurant.location.city;
      var alamat =item.restaurant.location.address;
      var hrg1=item.restaurant.average_cost_for_two;
      var hrg2=hrg1/2
      var imgbg = item.restaurant.thumb;
      if (imgbg==''){
        imgbg='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'
      }
      return( <Card avatar key={index}>
      <CardItem header  style = {{ backgroundColor:'#DD5144'}}>
        <Left>
          <Thumbnail source={{uri:imgbg}}/>
          <Body>
            <Text style = {{ color:'white'}}>{name}</Text>
            <Text note style = {{ color:'white'}}>{kota}</Text>
          </Body>
        </Left>
        <Right>
          <Text style = {{ color:'white'}}>Rp {hrg2}</Text>
        </Right>
      </CardItem>
      <CardItem cardBody>
        <Image source={{uri:imgbg}} style={{height:400,width:400,flex:1}}/>
      </CardItem>
      <CardItem footer  style = {{ backgroundColor:'#DD5144'}}>
        <Left><Button transparent>
          <Icon name="flag"/>
          </Button>
          <Text style = {{ color:'white'}}>{alamat}</Text>
        </Left>
      </CardItem>
      </Card>
      )
    })
    return (
     <Container>
       <Header searchBar rounded style = {{ backgroundColor:'#DD5144'}} >
        <Item>
        <Button transparent onPress={()=>this.klik()}><Icon name="search"/></Button>
          <Input placeholder="Cari Makanan..." onChangeText={(x)=>{this.setState({menu:x})}} />
        </Item>
       </Header>
       <ScrollView>
         {data}
       </ScrollView>
     </Container>
    );
  }
}
export default App;


