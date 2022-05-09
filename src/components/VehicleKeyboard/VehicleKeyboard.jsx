import { defineComponent } from 'vue'
import { createNamespace } from '../utils'
import VehicleKeyboardCell from './VehicleKeyboardCell'

const [name] = createNamespace('vehicle-keyboard')

import './index.less'

const SecondPageStatus = {
  DisableAll: 0,
  AllowAll: 1,
  AlphabetOnly: 2,
  NumberOnly: 3,
  AllowSpecialCharaters: 4
}

const firstPage = [
  ['京', '沪', '粤', '津', '冀', '晋', '蒙', '辽'],
  ['吉', '黑', '苏', '浙', '皖', '闽', '赣', '鲁'],
  ['豫', '鄂', '湘', '桂', '琼', '渝', '川', '贵'],
  ['云', '藏', '陕', '甘', '青', '宁', '新', '使']
]

const secondPage = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ['港', '澳', '学', '警', '领']
]

const smallVehicleNewEnergy = '0123456789'
const newEnergyLetter = 'ABCDEFGHJK'
const newEnergyLetterReg = new RegExp(`[${newEnergyLetter}]`)

/**
 新能源车牌号规则：
 https://zh.wikipedia.org/wiki/中华人民共和国民用机动车号牌#新能源汽车号牌
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
    modelValue: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: true
    }
  },
  emits: ['show', 'hide', 'update:visible', 'update:modelValue'],
  setup(props, { emit }) {
    const closeBoard = () => {
      emit('update:visible', false)
    }

    const handleEnter = (cell) => {
      if (props.modelValue.length < 8) {
        emit('update:modelValue', props.modelValue + cell)
      }
    }

    const handleDelete = () => {
      if (props.modelValue.length > 0) {
        emit('update:modelValue', props.modelValue.slice(0, -1))
      }
    }

    const renderProvinceSelect = () => (
      <view class="keyboard-container">
        {firstPage.map((row, index) => (
          <view class="keyboard-row" key={index}>
            {row.map((province) => (
              <VehicleKeyboardCell
                cell={province}
                key={province}
                onClick={handleEnter}
                type="province"
              />
            ))}
          </view>
        ))}
      </view>
    )

    const renderNumberSelect = (type = SecondPageStatus.AllowAll) => (
      <view class="keyboard-container">
        <view class="keyboard-row">
          {secondPage[0].map((cell) => (
            <VehicleKeyboardCell
              cell={cell}
              key={cell}
              onClick={handleEnter}
              disabled={!onlyAllowInput(cell, type)}
              type="normal"
            />
          ))}
        </view>
        <view class="keyboard-row">
          {secondPage[1].map((cell) => (
            <VehicleKeyboardCell
              cell={cell}
              key={cell}
              onClick={handleEnter}
              disabled={!onlyAllowInput(cell, type)}
              type="normal"
            />
          ))}
        </view>
        <view class="keyboard-row">
          {secondPage[2].map((cell) => (
            <VehicleKeyboardCell
              cell={cell}
              key={cell}
              onClick={handleEnter}
              disabled={!onlyAllowInput(cell, type)}
              type="normal"
            />
          ))}
        </view>
        <view class="keyboard-row">
          {secondPage[3].map((cell) => (
            <VehicleKeyboardCell
              cell={cell}
              key={cell}
              onClick={handleEnter}
              disabled={!onlyAllowInput(cell, type)}
              type="normal"
            />
          ))}
        </view>
        <view class="keyboard-row">
          {secondPage[4]
            .map((cell) => (
              <VehicleKeyboardCell
                cell={cell}
                key={cell}
                onClick={handleEnter}
                disabled={!onlyAllowInput(cell, type)}
                type="character"
              />
            ))
            .concat(renderBackBtn())}
        </view>
      </view>
    )

    const renderBackBtn = () => (
      <view
        class="keyboard-cell back-btn"
        onClick={handleDelete}
        key={'backBtn'}
      >
        <image src="https://img11.360buyimg.com/imagetools/jfs/t1/129395/8/12735/2030/5f61ac37E70cab338/fb477dc11f46056c.png" />
      </view>
    )

    const renderKeyboard = () => {
      switch (props.modelValue.length) {
        case 0:
          return renderProvinceSelect()
        case 1:
          return renderNumberSelect(SecondPageStatus.AlphabetOnly)
        case 2:
          return renderNumberSelect()
        case 3:
          return renderNumberSelect()
        case 4:
          return renderNumberSelect()
        case 5:
          return renderNumberSelect()
        case 6:
          return renderNumberSelect(SecondPageStatus.AllowSpecialCharaters)
        case 7:
          const newEnergyVehicleLastNumber = isNewEnergyPlate(props.modelValue)
          if (
            isSpecialCharacters(props.modelValue.slice(-1)) ||
            newEnergyVehicleLastNumber === false
          ) {
            return renderNumberSelect(SecondPageStatus.DisableAll)
          }
          return renderNumberSelect(newEnergyVehicleLastNumber)
        default:
          return renderNumberSelect(SecondPageStatus.DisableAll)
      }
    }

    return () => (
      <nut-popup
        visible={props.visible}
        position="bottom"
        overlay={props.overlay}
        onClickOverlay={closeBoard}
      >
        <view class="vehicle-plate-keyboard">
          <view class="vehicle-plate-keyboard-container">
            <view class="keyboard">{renderKeyboard()}</view>
          </view>
        </view>
      </nut-popup>
    )
  }
})
