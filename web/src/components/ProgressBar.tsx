import clsx from "clsx"

interface ProgressBarProps {
  progress: number
}

export function ProgressBar(props: ProgressBarProps) {
  return (
    <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
      <div
        role="progressbar"
        aria-label="Progresso de hábitos completados nesse dia"
        aria-valuenow={props.progress}
        className={clsx("h-3 rounded-xl bg-gradient-to-r from-green-700 to-emerald-400 transition-all", {
          'animate-pulse shadow-[color:var(--primary-border-color)] shadow-custom-md': props.progress == 100,   
        })}
        style={{
          width: `${props.progress}%`
        }}
      />
    </div>
  )
}