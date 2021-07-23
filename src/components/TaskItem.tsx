import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Task } from '../components/TasksList';
import trashIcon from '../assets/icons/trash/trash.png';
import penIcon from '../assets/icons/pen/pen.png';
import closeIcon from '../assets/icons/close/close.png';

interface TaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, newTaskTitle: string) => void;
}

export function TaskItem({
  index,
  task,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setNewTaskTitle(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, newTaskTitle);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={
              task.done === true ? styles.taskMarkerDone : styles.taskMarker
            }
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            style={task.done === true ? styles.taskTextDone : styles.taskText}
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
        {isEditing ? (
          <TouchableOpacity
            testID={`close-${index}`}
            style={styles.icon}
            onPress={handleCancelEditing}
          >
            <Image source={closeIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`pen-${index}`}
            style={styles.icon}
            onPress={handleStartEditing}
          >
            <Image source={penIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconDiv} />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={[styles.icon, { opacity: isEditing ? 0.2 : 1 }]}
          onPress={() => removeTask(task.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
  icon: {
    paddingHorizontal: 24,
    alignSelf: 'center',
  },
  iconDiv: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
  },
});
