import { Button, Empty, Input } from 'antd';
import { ModalType } from 'common/enum';
import TodoItem from 'components/TodoItem';
import TodoModal from 'components/TodoModal';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from 'store';
import {
  addTodo,
  deleteTodo,
  fetchTodo,
  searchTodo,
  updateTodoContent,
  updateTodoStatus,
} from 'store/todo/actions';
import { keepLogin, logout } from 'store/user/actions';

import styles from './index.module.scss';

const mapState = ({ todo, user }: AppState) => ({
  todo,
  user,
});

const mapDispatch = {
  logout,
  keepLogin,
  addTodo,
  deleteTodo,
  fetchTodo,
  searchTodo,
  updateTodoContent,
  updateTodoStatus,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface ITodoProps extends PropsFromRedux {}

const Todo: FC<ITodoProps> = ({
  todo,
  user: { userId, username },
  logout,
  deleteTodo,
  fetchTodo,
  updateTodoContent,
  updateTodoStatus,
  addTodo,
  searchTodo,
}) => {
  const [visible, setVisible] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.Add);
  const [modalTitle, setModalTitle] = useState('');
  const [content, setContent] = useState('');
  const [todoId, setTodoId] = useState('');

  const handleAdd = (content: string) => {
    addTodo(userId, content);
    setFinished(false);
  };

  const handleUpdateContent = (todoId: string, content: string) => {
    updateTodoContent(todoId, content);
  };

  const handleDelete = (todoId: string) => {
    deleteTodo(todoId);
  };

  const handleUpdateStatus = (todoId: string) => {
    updateTodoStatus(todoId);
  };

  const handleSearch = (ev: ChangeEvent<HTMLInputElement>) => {
    searchTodo(userId, ev.target.value);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setContent('');
  };

  const handleOpenModal = (
    type: ModalType,
    todoId?: string,
    content?: string
  ) => {
    setVisible(true);
    if (type === ModalType.Add) {
      setModalTitle('??????????????????');
      setContent('');
      setModalType(ModalType.Add);
    }
    if (type === ModalType.Edit) {
      setModalTitle('??????????????????');
      setModalType(ModalType.Edit);
      setContent(content!);
      setTodoId(todoId!);
    }
  };

  useEffect(() => {
    userId && fetchTodo(userId);
  }, [userId]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.user}>
        <span>Hi???{username}</span>
        <Button type="ghost" size="small" onClick={logout}>
          ??????
        </Button>
      </div>
      <div className={styles.queryBar}>
        <Input
          allowClear
          placeholder="???????????????????????????"
          onChange={handleSearch}
        />
        <Button
          type="primary"
          onClick={() => handleOpenModal(ModalType.Add)}
          className={styles.newTodo}
        >
          ??????
        </Button>
      </div>
      <div className={styles.main}>
        <ul className={styles.nav}>
          <li
            className={isFinished ? '' : styles.active}
            onClick={() => setFinished(false)}
          >
            <i className={`${styles.dot} ${styles.pending}`} />
            ?????????
          </li>
          <li
            className={isFinished ? styles.active : ''}
            onClick={() => setFinished(true)}
          >
            <i className={`${styles.dot} ${styles.resolved}`} />
            ?????????
          </li>
        </ul>
        <ul className={styles.list}>
          {todo.length ? (
            todo
              .filter((v) => v.status === isFinished)
              .map((v) => (
                <TodoItem
                  key={v.id}
                  content={v.content}
                  id={v.id}
                  type={modalType}
                  finished={isFinished}
                  onShowModal={handleOpenModal}
                  onDelete={handleDelete}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))
          ) : (
            <Empty className={styles.noData} />
          )}
        </ul>
      </div>
      <TodoModal
        todoId={todoId}
        modalType={modalType}
        content={content}
        visible={visible}
        title={modalTitle}
        onClose={handleCloseModal}
        onAdd={handleAdd}
        onUpdateContent={handleUpdateContent}
      />
    </div>
  );
};

export default connector(Todo);
