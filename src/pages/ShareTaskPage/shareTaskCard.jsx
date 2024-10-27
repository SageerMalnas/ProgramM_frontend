import PropTypes from 'prop-types';
import styles from './shareCard.module.css';

function ShareTaskCard({ task }) {
    const completedChecklists = task.checklists.filter((list) => list.checked);

    return (
        <div className={styles.card}>
            <div className={styles.priority}>
                <span className={styles[task.priority]}>&#8226;</span>
                {`${task.priority.toUpperCase()} PRIORITY`}
            </div>

            <h2 className={styles.title}>{task.title}</h2>

            <div className={styles.checklists}>
                <p>{`Checklists (${completedChecklists.length}/${task.checklists.length})`}</p>
                <ul>
                    {task.checklists.map((item) => (
                        <li key={item.id} className={styles.listItem}>
                            <input type="checkbox" checked={item.checked} readOnly />
                            <span>{item.title}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {task.dueDate && (
                <div className={styles.dueDate}>
                    <strong>Due Date: </strong>
                    <div className={styles.dueDatebutton}>
                        {new Date(task.dueDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                        })}
                    </div>

                </div>
            )}
        </div>
    );
}

ShareTaskCard.propTypes = {
    task: PropTypes.shape({
        title: PropTypes.string.isRequired,
        priority: PropTypes.string.isRequired,
        checklists: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                checked: PropTypes.bool.isRequired,
            })
        ),
        dueDate: PropTypes.string,
    }).isRequired,
};

export default ShareTaskCard;
