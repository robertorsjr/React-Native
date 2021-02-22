import React, {useEffect, useState} from 'react'
import {SafeAreaView, FlatList, Text, StatusBar, StyleSheet, TouchableOpacity} from 'react-native'
import api from './services/api'

export default function app(){
  const [projects , setProjects] = useState([]);

  async function hendleAddProject(){
    const response = await api.post('projects', {
       title: `Novo projeto${Date.now()}`,
       owner: 'Roberto'
    })
    setProjects([...projects, response.data])
  }

  useEffect(()=>{
    api.get('projects').then(response =>{
      setProjects(response.data);
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor='#FFF'/>
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({item})=> (
            <Text style={styles.project}>{item.title}</Text>
          )}
        />
        <TouchableOpacity style={styles.button} onPress={hendleAddProject}>
          <Text style={styles.textButton}>Add a Project</Text>
        </TouchableOpacity>
      </SafeAreaView>  
    </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#7159c1',
  },
  project:{
    fontSize:20,
    color:'#FFF'
  },
  button:{
    backgroundColor:'#FFF',
    margin:20,
    height:50,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center'
  },
  textButton:{
    fontWeight:'bold',
    fontSize:20
   },
})