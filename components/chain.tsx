import { id } from '../libs/object'
import Link from 'next/link'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import BlockLink from './blocklink'

dayjs.extend(relativeTime)

function ShortBlock({ block, height, i }) {
  const newDate = new Date()
  newDate.setTime(block.created*1000)
  const dateString = newDate.toUTCString()

  let diff

  try {
    diff = dayjs.unix(block.created).fromNow()
  }
  catch (e) {
    diff = ''
  }

  return (
    <tr>
      <td>{height - i}</td>
      <td>
        <BlockLink blockid={id(block)} short />
      </td>
      <td>
        {diff}
      </td>
      <td>
        {dateString}
      </td>
      <td>{block.miner}</td>
      <td>{block.txids.length}</td>
    </tr>
  )
}

export default function Chain({ chain, height }) {
  return (
    <div>
      <div>The canonical chain has height <strong>{ height }</strong>.</div>
      <br />

      <table>
        <tr>
          <th>Height</th>
          <th>Hash</th>
          <th>Age</th>
          <th>Time</th>
          <th>Miner</th>
          <th>txs</th>
        </tr>
      {chain.map((block, i) =>
        (
          <ShortBlock block={block} height={height} i={i} key={i} />
        )
      )}
      </table>

      <style jsx>{`
        table {
          text-align: left
        }

        table tr td {
          max-width: 30%
        }
      `}</style>
    </div>
  )
}
