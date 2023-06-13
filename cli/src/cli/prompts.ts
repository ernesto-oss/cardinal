import {
  ConfirmPrompt,
  SelectPrompt,
  TextPrompt,
  isCancel,
  block,
  type State,
} from "@clack/core";
import isUnicodeSupported from "is-unicode-supported";
import color from "picocolors";
import { cursor, erase } from 'sisteransi';

export { isCancel } from '@clack/core'

const unicode = isUnicodeSupported();
const s = (c: string, fallback: string) => (unicode ? c : fallback);
const S_STEP_ACTIVE = s("◆", "*");
const S_STEP_CANCEL = s("■", "x");
const S_STEP_ERROR = s("▲", "x");
const S_STEP_SUBMIT = s("◇", "o");

const S_RADIO_ACTIVE = s("●", ">");
const S_RADIO_INACTIVE = s("○", " ");

const symbol = (state: State) => {
  switch (state) {
    case "initial":
    case "active":
      return color.cyan(S_STEP_ACTIVE);
    case "cancel":
      return color.red(S_STEP_CANCEL);
    case "error":
      return color.yellow(S_STEP_ERROR);
    case "submit":
      return color.green(S_STEP_SUBMIT);
  }
};

export interface TextOptions {
  message: string;
  placeholder?: string;
  defaultValue?: string;
  initialValue?: string;
  validate?: (value: string) => string | void;
}

export interface ConfirmOptions {
  message: string;
  active?: string;
  inactive?: string;
  initialValue?: boolean;
}

type Primitive = Readonly<string | boolean | number>;

type Option<Value> = Value extends Primitive
  ? { value: Value; label?: string; hint?: string }
  : { value: Value; label: string; hint?: string };

export interface SelectOptions<Options extends Option<Value>[], Value> {
  message: string;
  options: Options;
  initialValue?: Value;
}

export type PromptGroupAwaitedReturn<T> = {
	[P in keyof T]: Exclude<Awaited<T[P]>, symbol>;
};

export interface PromptGroupOptions<T> {
	/**
	 * Control how the group can be canceled
	 * if one of the prompts is canceled.
	 */
	onCancel?: (opts: { results: Prettify<Partial<PromptGroupAwaitedReturn<T>>> }) => void;
}

type Prettify<T> = {
	[P in keyof T]: T[P];
} & {};

export type PromptGroup<T> = {
	[P in keyof T]: (opts: {
		results: Prettify<Partial<PromptGroupAwaitedReturn<Omit<T, P>>>>;
	}) => void | Promise<T[P] | void>;
};


export const text = (opts: TextOptions) => {
  return new TextPrompt({
    validate: opts.validate,
    placeholder: opts.placeholder,
    defaultValue: opts.defaultValue,
    initialValue: opts.initialValue,
    render() {
      const title = `${opts.message} \n ${'\u279C'}`;
      const placeholder = opts.placeholder
        ? color.inverse(opts.placeholder[0]) +
          color.dim(opts.placeholder.slice(1))
        : color.inverse(color.hidden("_"));
      const value = !this.value ? placeholder : this.valueWithCursor;

      switch (this.state) {
        case "error":
          return `${title.trim()} ${value}\n ${color.yellow(this.error)}\n`;
        case "submit":
          return `${title} ${color.dim(this.value || opts.placeholder)}`;
        case "cancel":
          return `${title} ${color.strikethrough(color.dim(this.value ?? ""))}${
            this.value?.trim() ? "\n" : ""
          }`;
        default:
          return `${title} ${value}`;
      }
    },
  }).prompt() as Promise<string | symbol>;
};

export const confirm = (opts: ConfirmOptions) => {
  const active = opts.active ?? "Yes";
  const inactive = opts.inactive ?? "No";
  return new ConfirmPrompt({
    active,
    inactive,
    initialValue: opts.initialValue ?? true,
    render() {
      const title = `${opts.message}\n`;
      const value = this.value ? active : inactive;

      switch (this.state) {
        case "submit":
          return `${title} ${color.dim(value)}`;
        case "cancel":
          return `${title} ${color.strikethrough(color.dim(value))}`;
        default: {
          return `${title} ${
            this.value ? `${active}` : `${color.dim(active)}`
          } ${color.dim("/")} ${
            !this.value ? `${inactive}` : `${color.dim(inactive)}`
          }`;
        }
      }
    },
  }).prompt() as Promise<boolean | symbol>;
};

export const select = <Options extends Option<Value>[], Value>(
	opts: SelectOptions<Options, Value>
) => {
	const opt = (option: Option<Value>, state: 'inactive' | 'active' | 'selected' | 'cancelled') => {
		const label = option.label ?? String(option.value);
		if (state === 'active') {
			return `${color.green(S_RADIO_ACTIVE)} ${label} ${
				option.hint ? color.dim(`(${option.hint})`) : ''
			}`;
		} else if (state === 'selected') {
			return `${color.dim(label)}`;
		} else if (state === 'cancelled') {
			return `${color.strikethrough(color.dim(label))}`;
		}
		return `${color.dim(S_RADIO_INACTIVE)} ${color.dim(label)}`;
	};

	return new SelectPrompt({
		options: opts.options,
		initialValue: opts.initialValue,
		render() {
			const title = `\n${opts.message}\n`;

			switch (this.state) {
				case 'submit':
					return `${title} ${opt(this.options[this.cursor], 'selected')}`;
				case 'cancel':
					return `${title} ${opt(
						this.options[this.cursor],
						'cancelled'
					)}`;
				default: {
					return `${title} ${this.options
						.map((option, i) => opt(option, i === this.cursor ? 'active' : 'inactive'))
						.join(`\n`)}\n \n`;
				}
			}
		},
	}).prompt() as Promise<Value | symbol>;
};

export const cancel = (message = '') => {
	process.stdout.write(`${color.red(message)}\n\n`);
};

export const intro = (title = '') => {
	process.stdout.write(`${title}\n`);
};

export const outro = (message = '') => {
	process.stdout.write(`${message}\n\n`);
};


/**
 * Define a group of prompts to be displayed
 * and return a results of objects within the group
 */
export const group = async <T>(
	prompts: PromptGroup<T>,
	opts?: PromptGroupOptions<T>
): Promise<Prettify<PromptGroupAwaitedReturn<T>>> => {
	const results = {} as any;
	const promptNames = Object.keys(prompts);

	for (const name of promptNames) {
		const prompt = prompts[name as keyof T];
		const result = await prompt({ results })?.catch((e) => {
			throw e;
		});

		if (typeof opts?.onCancel === 'function' && isCancel(result)) {
			results[name] = 'canceled';
			opts.onCancel({ results });
			continue;
		}

		results[name] = result;
	}

	return results;
};

const frames = unicode ? ['◒', '◐', '◓', '◑'] : ['•', 'o', 'O', '0'];

export const spinner = () => {
	let unblock: () => void;
	let loop: NodeJS.Timer;
	const delay = unicode ? 80 : 120;
	return {
		start(message = '') {
			message = message.replace(/\.?\.?\.$/, '');
			unblock = block();
			process.stdout.write(`${message}\n`);
			let i = 0;
			let dot = 0;
			loop = setInterval(() => {
				let frame = frames[i];
				process.stdout.write(cursor.move(-999, -1));
				process.stdout.write(
					`${color.magenta(frame)}  ${message}${
						Math.floor(dot) >= 1 ? '.'.repeat(Math.floor(dot)).slice(0, 3) : ''
					}   \n`
				);
				i = i === frames.length - 1 ? 0 : i + 1;
				dot = dot === frames.length ? 0 : dot + 0.125;
			}, delay);
		},
		stop(message = '') {
			process.stdout.write(cursor.move(-999, -2));
			process.stdout.write(erase.down(2));
			clearInterval(loop);
			process.stdout.write(`${color.green(S_STEP_SUBMIT)} ${message}\n`);
			unblock();
		},
	};
};
