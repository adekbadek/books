import React from 'react'

export default props =>
  <div className={props.wrapperClassName || 'pv4'}>
    <div>
      <table className={`f6 w-100 mw8 center ${props.tableClassName}`} cellSpacing='0'>
        <thead>
          <tr>
            {props.headers.map((t, i) => <th key={i} className='bb b--black-20 tl pb2 pr3'>{t}</th>)}
          </tr>
        </thead>
        <tbody className='lh-copy'>
          {props.children}
        </tbody>
      </table>
    </div>
  </div>
