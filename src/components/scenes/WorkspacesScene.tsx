import { Barbell, CaretUpDown, Check, Coins, Plus, UserCircleCheck, UsersFour } from '@phosphor-icons/react'
import { SceneFrame, ScenePanel } from './SceneFrame'
import { SCENE_USER, WORKSPACE_TOKEN_CAP, type SceneSize } from './sceneData'

const MEMBERS = [
  { initials: SCENE_USER.initials, tone: 'blue' },
  { initials: 'AL', tone: 'violet' },
  { initials: 'CK', tone: 'green' },
] as const

export function WorkspacesScene({ size }: { size: SceneSize }) {
  return (
    <SceneFrame size={size} label="Workspace menu for Personal, Northside Running, and Peak Studio, with members and a monthly token cap">
      <ScenePanel className="ws-panel">
        <div className="ws-layout">
          <div className="ws-main">
            <div className="ws-menu">
              <div className="ws-row is-pick">
                <UserCircleCheck size={18} />
                <span className="ws-copy">
                  <strong>Personal</strong>
                  <small>Workspace</small>
                </span>
                <Check className="tick" size={16} />
              </div>
              <div className="ws-row is-next">
                <UsersFour size={18} />
                <span className="ws-copy">
                  <strong>Northside Running</strong>
                  <small>Owner</small>
                </span>
                <Check className="tick" size={16} />
              </div>
              <div className="ws-row">
                <Barbell size={18} />
                <span className="ws-copy">
                  <strong>Peak Studio</strong>
                  <small>Member</small>
                </span>
                <Check className="tick" size={16} />
              </div>
              <div className="ws-divider" />
              <div className="ws-create">
                <Plus size={16} />
                Create workspace
              </div>
            </div>
            <div className="ws-btn">
              <span className="ws-swap">
                <UserCircleCheck className="home" size={18} />
                <UsersFour className="alt" size={18} />
              </span>
              <span className="ws-swap ws-copy">
                <span className="home">
                  <strong>{SCENE_USER.workspace}</strong>
                  <small>{SCENE_USER.workspaceMeta}</small>
                </span>
                <span className="alt">
                  <strong>Northside Running</strong>
                  <small>Owner</small>
                </span>
              </span>
              <CaretUpDown size={16} />
            </div>
            {size === 'wide' ? (
              <>
                <div className="ws-token">
                  <Coins size={18} />
                  <span>{`${SCENE_USER.tokens} tokens`}</span>
                  <span>Top up</span>
                </div>
                <div className="ws-profile">
                  <span className="ws-avatar">{SCENE_USER.initials}</span>
                  <span className="ws-copy">
                    <strong>{SCENE_USER.name}</strong>
                    <small>{SCENE_USER.email}</small>
                  </span>
                  <CaretUpDown size={16} />
                </div>
              </>
            ) : null}
            <div className="ws-cap">
              <div className="members">
                {MEMBERS.map((member) => (
                  <span className={`member is-${member.tone}`} key={member.initials}>
                    {member.initials}
                  </span>
                ))}
              </div>
              <span className="ws-cap-line">
                <span>Monthly token cap</span>
                <span>{`${WORKSPACE_TOKEN_CAP} tokens`}</span>
              </span>
            </div>
          </div>
        </div>
      </ScenePanel>
    </SceneFrame>
  )
}
