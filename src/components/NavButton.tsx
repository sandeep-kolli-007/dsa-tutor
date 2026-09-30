import { IonIcon } from '@ionic/react';

export function NavButton(props: { active: boolean; icon: string; label: string; onClick: () => void }) {
  return (
    <button className={'nav-button ' + (props.active ? 'active' : '')} onClick={props.onClick}>
      <IonIcon icon={props.icon} />
      <span>{props.label}</span>
    </button>
  );
}
