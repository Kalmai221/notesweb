import IconSearch from 'heroicons/react/outline/Search'
import IcoTrash from 'heroicons/react/outline/Trash'
import IconMoon from 'heroicons/react/outline/Moon'
import IconChevronDoubleLeft from 'heroicons/react/outline/ChevronDoubleLeft'
import IconSun from 'heroicons/react/outline/Sun'
import IconGlobe from 'heroicons/react/outline/Globe'
import { FC, HTMLProps, useCallback } from 'react'
import { UIState } from 'containers/ui'
import classNames from 'classnames'
import { useDarkMode } from 'next-dark-mode'
import { SearchState } from 'containers/search'
import Search from 'components/search'

const ButtonItem: FC<HTMLProps<HTMLDivElement>> = (props) => {
  const { children, className, ...attrs } = props
  return (
    <div
      {...attrs}
      className={classNames(
        'block p-3 text-gray-500 hover:text-gray-800 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}

const ButtonMenu = () => {
  const {
    sidebar: { toggleFold, isFold },
  } = UIState.useContainer()
  const onFold = useCallback(() => {
    toggleFold()
  }, [toggleFold])

  return (
    <ButtonItem onClick={onFold}>
      <IconChevronDoubleLeft
        className={classNames('transform transition-transform', {
          'rotate-180': isFold,
        })}
      />
    </ButtonItem>
  )
}

const ButtonTheme = () => {
  const {
    autoModeActive,
    darkModeActive,
    switchToAutoMode,
    switchToDarkMode,
    switchToLightMode,
  } = useDarkMode()

  const onToggleThemeMode = useCallback(() => {
    if (autoModeActive) {
      switchToLightMode()
    } else if (darkModeActive) {
      switchToAutoMode()
    } else {
      switchToDarkMode()
    }
  }, [
    autoModeActive,
    darkModeActive,
    switchToAutoMode,
    switchToDarkMode,
    switchToLightMode,
  ])

  return (
    <ButtonItem onClick={onToggleThemeMode}>
      {autoModeActive ? (
        <IconGlobe />
      ) : darkModeActive ? (
        <IconMoon />
      ) : (
        <IconSun />
      )}
    </ButtonItem>
  )
}

const ButtonSearch = () => {
  const { openModal } = SearchState.useContainer()

  return (
    <ButtonItem onClick={openModal}>
      <IconSearch />
    </ButtonItem>
  )
}

const SidebarTool = () => {
  return (
    <aside className="h-full flex flex-col w-10 flex-none bg-gray-200">
      <Search />

      <ButtonSearch />

      <ButtonItem>
        <IcoTrash />
      </ButtonItem>

      <div className="mt-auto">
        <ButtonMenu></ButtonMenu>
        <ButtonTheme></ButtonTheme>
      </div>
    </aside>
  )
}

export default SidebarTool
