import React from 'react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import INote from '../../intefaces/iNote';
import { getNoteUtil } from '../../utils/noteUtil';
import NoteContainer from '../noteContainer/NoteContainer';
import './styles/notesList.sass'


interface INotesList{
  filter: string
}
const NotesList = (props: INotesList) =>{

  const [notes, setNotes] = useState<Array<INote>>();

  useEffect(() =>{
    if(props.filter){
      setNotes(getNoteUtil().filter((item: INote) => {
        const tag = item.tags.filter((item: string) => item === props.filter)
        return tag.length > 0 && item  
      }))
    } else{
      setNotes(getNoteUtil())
    }
  }, [props.filter])
  
  return(
    <div className='notesList' style={{display: notes ? 'block' : 'none'}}>
      {
        notes?.map(item =>{
          return(
            <React.Fragment key={uuidv4()}>
              <NoteContainer note={item}/>
            </React.Fragment>
          )
        })
      }
    </div>
  )
}

export default NotesList;