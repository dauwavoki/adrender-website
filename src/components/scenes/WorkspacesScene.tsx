import { Barbell, CaretUpDown, Check, Coins, Plus, UserCircleCheck, UsersFour } from '@phosphor-icons/react'
import { SceneFrame } from './SceneFrame'
import { SCENE_USER, WORKSPACE_TOKEN_CAP, type SceneSize } from './sceneData'

const MEMBERS = [SCENE_USER.initials, 'AL', 'CK']

export function WorkspacesScene({ size }: { size: SceneSize }) {
  return (
    <SceneFrame size={size} label="Workspace menu for Personal, Northside Running, and Peak Studio">
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
        </div>
        <div className="ws-side">
          <div className="members">
            {MEMBERS.map((initials) => (
              <span className="member" key={initials}>
                {initials}
              </span>
            ))}
          </div>
          <p>{`Monthly token cap · ${WORKSPACE_TOKEN_CAP}`}</p>
        </div>
      </div>
    </SceneFrame>
  )
}
