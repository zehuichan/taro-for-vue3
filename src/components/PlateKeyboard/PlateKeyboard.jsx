import { defineComponent } from 'vue'
import { createNamespace, makeStringProp, truthProp } from '../utils'

const [name] = createNamespace('plate-keyboard')

// Components
import PlateKeyboardKey from './PlateKeyboardKey'

import './index.less'

const SecondPageStatus = {
  DisableAll: 0,
  AllowAll: 1,
  AlphabetOnly: 2,
  NumberOnly: 3,
  AllowSpecialCharaters: 4
}

const firstPage = [
  '京',
  '沪',
  '粤',
  '津',
  '冀',
  '晋',
  '蒙',
  '辽',
  '吉',
  '黑',
  '苏',
  '浙',
  '皖',
  '闽',
  '赣',
  '鲁',
  '豫',
  '鄂',
  '湘',
  '桂',
  '琼',
  '渝',
  '川',
  '贵',
  '云',
  '藏',
  '陕',
  '甘',
  '青',
  '宁',
  '新',
  '使'
]

const secondPage = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
  '港',
  '澳',
  '学',
  '警',
  '领'
]

const smallVehicleNewEnergy = '0123456789'
const newEnergyLetter = 'ABCDEFGHJK'
const newEnergyLetterReg = new RegExp(`[${newEnergyLetter}]`)

/**
 *  新能源车牌号规则：
 *  https://zh.wikipedia.org/wiki/中华人民共和国民用机动车号牌#新能源汽车号牌
 * @param plate
 * @returns {string|boolean}
 */
const isNewEnergyPlate = (plate) => {
  if (isNewEnergyBigVehicle(plate)) {
    return newEnergyLetter
  } else if (isNewEnergySmallVehicle(plate)) {
    return smallVehicleNewEnergy
  }
  return false
}

const isNewEnergySmallVehicle = (plate) =>
  newEnergyLetterReg.test(plate[2]) && /^[0-9]+$/.test(plate.slice(4, 7))

const isNewEnergyBigVehicle = (plate) => /^[0-9]+$/.test(plate.slice(2, 7))

const isAlphabet = (s) => /[ABCDEFGHJKLMNPQRSTUVWXYZ]/.test(s)
const isNumber = (s) => /[0-9]/.test(s)
const isSpecialCharacters = (s) => /[港澳学警领]/.test(s)

const onlyAllowInput = (s, onlyAllows) => {
  if (typeof onlyAllows === 'string') {
    return onlyAllows.indexOf(s) !== -1
  } else if (onlyAllows === SecondPageStatus.AllowAll) {
    return isAlphabet(s) || isNumber(s)
  } else if (onlyAllows === SecondPageStatus.AlphabetOnly) {
    return isAlphabet(s)
  } else if (onlyAllows === SecondPageStatus.NumberOnly) {
    return isNumber(s)
  } else if (onlyAllows === SecondPageStatus.AllowSpecialCharaters) {
    return isAlphabet(s) || isNumber(s) || isSpecialCharacters(s)
  }
}

export default defineComponent({
  name,
  props: {
    visible: Boolean,
    modelValue: makeStringProp(''),
    transition: truthProp,
    blurOnClose: truthProp,
    randomKeyOrder: Boolean
  },
  emits: ['input', 'close', 'delete', 'update:modelValue', 'update:visible'],
  setup(props, { emit }) {
    const genFirstPageKeys = () =>
      firstPage.map((key) => (
        <PlateKeyboardKey text={key} type="province" onPress={onPress} />
      ))

    const genSecondPageKeys = (type = SecondPageStatus.AllowAll) =>
      secondPage.map((key) => (
        <PlateKeyboardKey
          text={key}
          type="normal"
          disabled={!onlyAllowInput(key, type)}
          onPress={onPress}
        />
      ))

    const renderKeys = () => {
      switch (props.modelValue.length) {
        case 0:
          return genFirstPageKeys()
        case 1:
          return genSecondPageKeys(SecondPageStatus.AlphabetOnly)
        case 2:
          return genSecondPageKeys()
        case 3:
          return genSecondPageKeys()
        case 4:
          return genSecondPageKeys()
        case 5:
          return genSecondPageKeys()
        case 6:
          return genSecondPageKeys(SecondPageStatus.AllowSpecialCharaters)
        case 7:
          const newEnergyVehicleLastNumber = isNewEnergyPlate(props.modelValue)
          if (
            isSpecialCharacters(props.modelValue.slice(-1)) ||
            newEnergyVehicleLastNumber === false
          ) {
            return genSecondPageKeys(SecondPageStatus.DisableAll)
          }
          return genSecondPageKeys(newEnergyVehicleLastNumber)
        default:
          return genSecondPageKeys(SecondPageStatus.DisableAll)
      }
    }

    const renderDeleteKey = () => (
      <PlateKeyboardKey text="X" type="delete" onPress={onPress} />
    )

    const close = () => {
      emit('close')
      emit('update:visible', false)
    }

    const onPress = (text, type) => {
      const value = props.modelValue
      if (type === 'delete') {
        emit('delete')
        emit('update:modelValue', value.slice(0, value.length - 1))
      } else {
        emit('input', text)
        emit('update:modelValue', value + text)
      }
    }

    return () => (
      <nut-popup
        visible={props.visible}
        position="bottom"
        overlay-style={{ background: 'transparent' }}
        onClickOverlay={close}
      >
        <view class={name}>
          <view class={{ [`${name}__body`]: true }}>
            {renderKeys()}
            {renderDeleteKey()}
          </view>
        </view>
      </nut-popup>
    )
  }
})
